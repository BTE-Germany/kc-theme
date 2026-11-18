import { useEffect, useState } from "react";
import { BASE_URL } from "@/kc.gen";

const CMS_URL = "https://cms.bte-germany.de";

export type BackgroundImage = {
    src: string;
    attribution: string | undefined;
};

type CmsResponse = {
    data: { image: string; attribution?: string | null }[];
};

/** Picks an image width bucket so the CMS can serve (and cache) a reasonably sized file. */
function getImageWidth() {
    const neededWidth = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);

    return [1280, 1920, 2560].find(width => width >= neededWidth) ?? 2560;
}

function preload(src: string) {
    return new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to load ${src}`));
        image.src = src;
    });
}

async function fetchRandomImage(signal: AbortSignal): Promise<BackgroundImage> {
    const response = await fetch(
        `${CMS_URL}/items/login_images?filter[status][_eq]=published&fields=image,attribution`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(`CMS responded with ${response.status}`);
    }

    const { data } = (await response.json()) as CmsResponse;

    if (data.length === 0) {
        throw new Error("No published login images");
    }

    const picked = data[Math.floor(Math.random() * data.length)];

    return {
        src: `${CMS_URL}/assets/${picked.image}?format=webp&quality=78&width=${getImageWidth()}`,
        attribution: picked.attribution ?? undefined
    };
}

/**
 * Loads a random, published background image from the BTE Germany CMS.
 * Returns `undefined` until the image is fully downloaded, so it can be faded in without flashing.
 * Falls back to the image bundled with the theme if the CMS is unreachable.
 */
export function useBackgroundImage() {
    const [image, setImage] = useState<BackgroundImage | undefined>(undefined);

    useEffect(() => {
        let isCancelled = false;
        // Give up on the CMS after a few seconds and use the bundled image instead.
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 6000);

        (async () => {
            let next: BackgroundImage;

            try {
                next = await fetchRandomImage(controller.signal);
                await preload(next.src);
            } catch {
                next = { src: `${BASE_URL}background.webp`, attribution: undefined };
                await preload(next.src).catch(() => undefined);
            } finally {
                window.clearTimeout(timeout);
            }

            if (!isCancelled) {
                setImage(next);
            }
        })();

        return () => {
            isCancelled = true;
            window.clearTimeout(timeout);
            controller.abort();
        };
    }, []);

    return image;
}
