<script lang="ts">
	export const prerender = false;
	import { connected, signerAddress, provider } from 'svelte-ethers-store';

	import { displayAddress } from '$lib/web3/utils';
	import { connect } from '$lib/web3/connect';

	let connecting = false;

	const onClick = async () => {
		connecting = true;
		try {
			await connect();
		} finally {
			connecting = false;
		}
	};
</script>

{#if $connected && $signerAddress}
	{#await displayAddress($signerAddress, $provider) then value}
		<div
			class="fixed right-2 bottom-1 px-4 py-2 rounded font-mono text-sm md:text-base flex flex-row items-center"
		>
			<span
				class="w-4 h-4 md:w-8 md:h-8 mr-2"
				style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA65JREFUWEetWE1uVDEMdlYUTjDdMLdgygWoBGLJdYrgOiyhsJo9PcbMqpygLRIKchIntmMnGXXeZjTvOfbnz7/vhc3NbQR1be8u9C047B67e/xGAIBOEQkYDzsbEeBw1dsI5wI4RG8ANUlAgMrLKUCURwIqg5wNi7Yhlc0NCTBb6aMUIQEknfS7HuICfxFUpgeFAbKN8r/8EEDBQQ0xu+sCdIDM8TVgCA7lX3OAhVjOYIAIEQKEN9f7xCC/rILQoNHkn58f1Ukb6ub9d7fo6okAsP19wUlOZyRATrWyZbF63wHsSyVGgMsPNkDtjmUj7K73rG4ywuPuMRFM+dJyRgIQAKV4Fiz3fAZ9G/TEBNgna4Tt3cuOngZwnIWjEHOlKcQl3xLACNAAMmdSw1T9yGqs9790DjJzTF8GKNmyKrbZaLKKwWzAnBqCpKzAyhkBpOb0g0gXs6lTkZSHTohtgDqAo35pGc85bV9cd3WYkZ0Y1PmNIcb4u7O12LIZ7IGsznG7it/tsR+6fXCU/mIasKolZdnxCIfdU05+x2MREcXWIAetviEdeR6DaU7wblSmi7RhLgtNZAxyCrCkyfFt3xXSlBCk2rbC5uYHdpuMyasGJ8ER4JxnpytwnaPwW/tgh4dyVPfG0lgp1/jk4Tr8Ipm7Fy5vbmsVC/vzFcXug4ZNBEjbSbcNONGhiPo5mAB6Ho4atSrnCHC86vvggv8ZIzHYOzKjnz+fyXo0Tc4FyBu1dTx7yFv66K2oaFjodSLECzR2AMdnnFZQtt/aBRYMj1JPFPioismOZ++MOGqbwxFLWZxycN5mLNac3JmEmBt2G7XSIUddXY/6F+gXnz/No5LOLyRJBHj6+q3pK0cWVv58JvctSfUIIFWZ2jkchzKapy8MYJHkAE/aB/E8AZTB7WrdmJcKJ87nAPC3ADT3QXZkvlEXDZzB07qeHXJkUC8L7b2nxcReWMuHIq5gKQfJJHkw8GQWYiJx+m2GMjEtnepaWbcQs7Xy9/mGiy0Wp8zkCnCWC3ojQfn8+cK4CnNE4MqXCipOrY0x2OKCuaCjc9w95G8l7AXSBaisnAlg07r6dUvIDfKtvgMX71DUt6H6hJ4kKXTsDZ9gr7JA8tyMf1aCSXJ6kmz/vUo1XUV1l6/EZgndNPy5MV+lqtGyd1qdIhBAnjZWC5jPuSJREZ/WLfkw4LbOAPB0IL2zWQcyiGSmcU7+ugyy2NlhfCYwQ+k0xGRyHOIG7NR9sMo7By2A/wFbz/4fkWOOoAAAAABJRU5ErkJggg==&quot;); background-size: cover;"
			/>
			{value}
		</div>
	{/await}
{:else}
	<button
		class="fixed right-2 bottom-1 px-4 py-2 rounded bg-black text-white font-mono text-sm md:text-base"
		disabled={connecting}
		on:click={onClick}>{connecting ? 'connecting...' : 'connect wallet'}</button
	>
{/if}
