
<template>
  <div class="video-card">
    <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="thumbnail-link"
    >
      <img
          :src="thumbnail"
          :alt="title"
          class="video-thumbnail"
      />
      <div class="play-overlay">
        <div class="play-button">▶</div>
      </div>
    </a>

    <div class="video-info">
      <h3 class="video-title">{{ title }}</h3>
      <p class="video-channel">{{ channel }}</p>
      <p class="video-views">{{ formattedViews }} views</p>

      <button
          @click="handleLikeClick"
          class="like-button"
      >
        ❤ Like
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoId: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['liked']);
const formattedViews = computed(() => {
  if (props.views >= 1000000) {
    return (props.views / 1000000).toFixed(1) + 'M';
  } else if (props.views >= 1000) {
    return (props.views / 1000).toFixed(0) + 'K';
  }
  return props.views.toString();
});

const handleLikeClick = () => {
  emit('liked', props.videoId);
};
</script>

<style scoped>
.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.thumbnail-link {
  position: relative;
  display: block;
  text-decoration: none;
  overflow: hidden;
}

.video-thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s;
}

.thumbnail-link:hover .video-thumbnail {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s;
}

.thumbnail-link:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 0, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  padding-left: 4px;
  transform: scale(1);
  transition: transform 0.2s;
}

.thumbnail-link:hover .play-button {
  transform: scale(1.1);
}

.video-info {
  padding: 16px;
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1a1a1a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-channel {
  font-size: 14px;
  color: #606060;
  margin: 0 0 4px 0;
}

.video-views {
  font-size: 13px;
  color: #909090;
  margin: 0 0 12px 0;
}

.like-button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.like-button:hover {
  background-color: #cc0000;
}

.like-button:active {
  transform: scale(0.95);
}
</style>