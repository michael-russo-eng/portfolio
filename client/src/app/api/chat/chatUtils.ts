


export const getRunPodKeys = () => {
    const RUN_POD_API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;
    const RUN_POD_INSTANCE_URL = process.env.NEXT_PUBLIC_RUN_POD_INSTANCE_URL;
    if (!RUN_POD_API_KEY){
        throw new Error("Missing vLLM API Key...")
    }

    if (!RUN_POD_INSTANCE_URL){
        throw new Error("Missing Run Pod Instance URL...")
    }

    return {RUN_POD_API_KEY, RUN_POD_INSTANCE_URL}
}