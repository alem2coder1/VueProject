import { ref, computed, watch, onMounted } from 'vue';

const mockVideos = [
    {
        id: 1,
        title: 'Халық әні - Алқоңыр',
        channel: 'Kazakh Folk Music',
        views: 125000,
        likes: 23,
        thumbnail: 'https://i.ytimg.com/vi/Rxkva79581A/mqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=Rxkva79581A'
    },
    {
        id: 2,
        title: 'Алтынгүл Бапарқызы "Қара-ай көзім"',
        channel: 'Altyngul Baparqyzy',
        views: 129000,
        likes: 26,
        thumbnail: 'https://i.ytimg.com/vi/psjTkEvYxI8/mqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=psjTkEvYxI8'
    },
    {
        id: 3,
        title: '"Құрбым-ай" Гаукартас Космонов',
        channel: 'Gaukartas Kosmonov',
        views: 120000,
        likes: 253,
        thumbnail: 'https://i.ytimg.com/vi/kZjlPEF8eZY/mqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=kZjlPEF8eZY'
    }
];

export function useVideos() {
    const videos = ref([]);
    const searchQuery = ref('');
    const totalLikes = ref(0);
    const isLoading = ref(true);

    const filteredVideos = computed(() => {
        if (!searchQuery.value) {
            return videos.value;
        }
        const query = searchQuery.value.toLowerCase();
        return videos.value.filter(video =>
            video.title.toLowerCase().includes(query) ||
            video.channel.toLowerCase().includes(query)
        );
    });

    const videoCount = computed(() => filteredVideos.value.length);

    watch(searchQuery, (newQuery, oldQuery) => {
        console.log(`Search query changed from "${oldQuery}" to "${newQuery}"`);
        console.log(`Found ${filteredVideos.value.length} videos`);
    });

    const handleLike = (videoId) => {
        totalLikes.value++;
        console.log(`Video ${videoId} was liked! Total likes: ${totalLikes.value}`);
    };

    onMounted(() => {
        console.log('Component mounted - Loading video data...');
        setTimeout(() => {
            videos.value = mockVideos;
            isLoading.value = false;
            console.log('Video data loaded successfully!');
        }, 1500);
    });

    return {
        videos,
        searchQuery,
        totalLikes,
        isLoading,
        filteredVideos,
        videoCount,
        handleLike
    };
}