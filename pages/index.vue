<script setup lang='ts'>

const link = ref('');

const { loading, result, getImageSrc } = useApi();

const proxiedImageUrl = computed(() => {
    if (result.value) {
        return `/api/image-proxy/${encodeURIComponent(result.value)}`;
    }
    return null;
});

const downloadFilename = computed(() => {
    if (result.value) {
        try {
            const url = new URL(result.value);
            const pathnameParts = url.pathname.split('/');
            const potentialFilename = pathnameParts[pathnameParts.length - 1];
            if (potentialFilename && potentialFilename.includes('.')) {
                return potentialFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
            }
        } catch (e) {
        }
    }
    return 'downloaded_image.jpg';
});

</script>

<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div class="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
            <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                InScrapper
            </h1>

            <div class="space-y-4">
                <UInput v-model="link" size="xl" variant="outline" placeholder="Paste Instagram image/post URL here..."
                    inputClass="text-lg" class="w-full" />
                <UButton @click="getImageSrc(link)" size="xl" class="w-full flex justify-center items-center"
                    :loading="loading" block>
                    <span v-if="!loading">Generate Image</span>
                    <span v-else>Generating...</span>
                </UButton>
            </div>

            <div v-if="loading" class="mt-8 text-center text-gray-600 dark:text-gray-400">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 mx-auto" />
                <p class="mt-2">Loading, please wait...</p>
            </div>

            <div v-if="!loading && proxiedImageUrl" class="mt-8 space-y-4">
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <img :src="proxiedImageUrl" alt="Scraped Image"
                        class="w-full h-auto object-contain max-h-[70vh] p-4 rounded-lg" />
                </div>
                <UButton :to="proxiedImageUrl" tag="a" :download="downloadFilename" target="_blank"
                    icon="i-heroicons-arrow-down-tray" size="lg" block variant="outline">
                    Download Image
                </UButton>
            </div>

            <div v-if="!loading && result && !proxiedImageUrl" class="mt-8 text-center text-red-500">
                <p>Could not load image. Please check the URL or try again.</p>
            </div>
        </div>

        <footer class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>InScrapper &copy; {{ new Date().getFullYear() }}</p>
        </footer>
    </div>
</template>

<style>
body {
    font-family: 'Inter', sans-serif;
}
</style>