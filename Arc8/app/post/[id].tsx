import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFeedStore } from '@/stores/feedStore';
import { FeedPost } from '@/components/feed/FeedPost';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posts = useFeedStore(state => state.posts);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <ThemedView style={styles.loading}>
        <ActivityIndicator size="large" color="#60A5FA" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <FeedPost post={post} />
        
        {post.metadata.replies > 0 && (
          <View style={styles.repliesSection}>
            <ThemedText style={styles.repliesTitle}>
              Replies ({post.metadata.replies})
            </ThemedText>
            {/* TODO: Implement replies list */}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repliesSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
  },
  repliesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
}); 