/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEB3_PROVIDER: string;
	readonly VITE_LEXICONOMY_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
