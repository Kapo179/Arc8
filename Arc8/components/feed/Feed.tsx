import React, { useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, ActivityIndicator, View, Pressable } from 'react-native';
import { useFeedStore } from '@/stores/feedStore';
import { FeedPost } from './FeedPost';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

interface FeedProps {
  type: 'forYou' | 'activity';
}

export function Feed({ type }: FeedProps) {
  const router = useRouter();
  const { posts, loading, error, fetchFeed, fetchMore, hasMore } = useFeedStore();

  useEffect(() => {
    fetchFeed(type);
  }, [type]);

  if (error) {
    return (
      <View style={styles.centered}>
        <ThemedText style={styles.error}>{error}</ThemedText>
        <Pressable 
          style={styles.retryButton} 
          onPress={() => fetchFeed(type)}
        >
          <ThemedText style={styles.retryText}>Retry</ThemedText>
        </Pressable>
      </View>
    );
  }

  const handleRefresh = () => {
    fetchFeed(type);
  };

  const handleLoadMore = () => {
    fetchMore();
  };

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#60A5FA" />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) return null;
    return (
      <ThemedText style={styles.emptyText}>
        No posts to show
      </ThemedText>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <FeedPost 
          post={item} 
          onPress={() => handlePostPress(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      onEndReached={hasMore ? handleLoadMore : undefined}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={loading && posts.length === 0}
          onRefresh={handleRefresh}
          tintColor="#60A5FA"
        />
      }
      ListFooterComponent={renderFooter}
      contentContainerStyle={[
        styles.content,
        posts.length === 0 && styles.centered
      ]}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#60A5FA',
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9CA3AF',
  },
}); 