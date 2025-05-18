export const useApi = () => { 
    const loading = ref(false); 
    const result = ref<string | null>(null);

    async function getImageSrc(pageUrl: string) {
        if (!pageUrl) {
            result.value = null;
            return;
        }
        loading.value = true;
        result.value = null; 
        try {
            const response = await $fetch<{ link: string }>('/api/thumbnail', {
                method: 'POST',
                body: { link: pageUrl }
            });
            result.value = response.link;
        } catch (error) {
            console.error('Error fetching image source:', error);
            result.value = null; 
        } finally {
            loading.value = false;
        }
    }

    return {
        getImageSrc,
        loading,
        result
    };
};