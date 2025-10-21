<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">🎵 Kazakh Music</h1>
        <div class="total-likes">
          ❤ Total Likes: {{ totalLikes }}
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <div class="search-section">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search videos by title or channel..."
              class="search-input"
          />
          <p class="search-result">
            Found {{ videoCount }} video{{ videoCount !== 1 ? 's' : '' }}
          </p>
        </div>

        <div v-if="isLoading" class="loading">
          <div class="spinner"></div>
          <p>Loading videos...</p>
        </div>

        <div v-else-if="filteredVideos.length === 0" class="empty-state">
          <p>No videos found.</p>
        </div>

        <div v-else class="video-grid">
          <VideoCard
              v-for="video in filteredVideos"
              :key="video.id"
              :video-id="video.id"
              :title="video.title"
              :channel="video.channel"
              :views="video.views"
              :thumbnail="video.thumbnail"
              :url="video.url"
              @liked="handleLike"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import VideoCard from './components/VideoCard.vue';
import { useVideos } from './composables/useVideos.js';

const {
  searchQuery,
  totalLikes,
  isLoading,
  filteredVideos,
  videoCount,
  handleLike
} = useVideos();
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f9f9f9;
}

#app {
  min-height: 100vh;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #ff0000;
}

.total-likes {
  background-color: #ffebee;
  color: #c62828;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.main-content {
  padding: 32px 0;
}

.search-section {
  margin-bottom: 32px;
}

.search-input {
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #ff0000;
}

.search-result {
  margin-top: 12px;
  color: #606060;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f0f0f0;
  border-top-color: #ff0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading p {
  color: #606060;
  font-size: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-state p {
  font-size: 18px;
  color: #909090;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }

  .logo {
    font-size: 20px;
  }

  .total-likes {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>