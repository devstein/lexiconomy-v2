/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEB3_PROVIDER: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
