import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFeedStore } from '@/stores/feedStore';
import type { Post } from '@/types/feed';
import * as Haptics from 'expo-haptics';

interface FeedPostProps {
  post: Post;
  onPress?: () => void;
}

export function FeedPost({ post, onPress }: FeedPostProps) {
  const likeScale = useRef(new Animated.Value(1)).current;
  const repostScale = useRef(new Animated.Value(1)).current;
  const likePost = useFeedStore(state => state.likePost);
  const repost = useFeedStore(state => state.repost);

  const animateButton = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();
  };

  const handleLike = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animateButton(likeScale);
    await likePost(post.id);
  };

  const handleRepost = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animateButton(repostScale);
    await repost(post.id);
  };

  return (
    <Pressable 
      style={styles.container} 
      onPress={onPress}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: post.author.avatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.authorInfo}>
          <View style={styles.nameRow}>
            <ThemedText style={styles.displayName}>
              {post.author.displayName}
            </ThemedText>
            {post.author.verified && (
              <MaterialCommunityIcons 
                name="check-decagram" 
                size={16} 
                color="#60A5FA" 
                style={styles.verifiedBadge}
              />
            )}
          </View>
          <ThemedText style={styles.username}>@{post.author.username}</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.content}>{post.content.text}</ThemedText>

      {post.content.media && post.content.media.length > 0 && (
        <View style={styles.mediaContainer}>
          {post.content.media.map((media, index) => (
            <Image
              key={index}
              source={{ uri: media.url }}
              style={[
                styles.media,
                media.aspectRatio && { aspectRatio: media.aspectRatio }
              ]}
            />
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <Pressable onPress={handleLike}>
          <Animated.View style={[styles.actionButton, { transform: [{ scale: likeScale }] }]}>
            <MaterialCommunityIcons 
              name={post.liked ? "heart" : "heart-outline"} 
              size={20} 
              color={post.liked ? "#EF4444" : "#9CA3AF"} 
            />
            <ThemedText style={styles.actionText}>{post.metadata.likes}</ThemedText>
          </Animated.View>
        </Pressable>

        <Pressable onPress={handleRepost}>
          <Animated.View style={[styles.actionButton, { transform: [{ scale: repostScale }] }]}>
            <MaterialCommunityIcons 
              name={post.reposted ? "repeat-variant" : "repeat"} 
              size={20} 
              color={post.reposted ? "#10B981" : "#9CA3AF"} 
            />
            <ThemedText style={styles.actionText}>{post.metadata.reposts}</ThemedText>
          </Animated.View>
        </Pressable>

        <View style={styles.actionButton}>
          <MaterialCommunityIcons name="comment-outline" size={20} color="#9CA3AF" />
          <ThemedText style={styles.actionText}>{post.metadata.replies}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D3748',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  username: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  mediaContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: 200,
    backgroundColor: '#2D3748',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#9CA3AF',
  },
}); 