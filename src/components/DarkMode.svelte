<script lang="ts">
  import { writable } from 'svelte/store'
  let isDarkMode = writable<boolean | null>(null)

	$effect(() => {
		$isDarkMode = localStorage.getItem('darkMode') === 'true'
	})

	$effect(() => {
		if ($isDarkMode) {
			document.documentElement.setAttribute('data-mode', 'dark')
		} else {
			document.documentElement.setAttribute('data-mode', 'light')
		}
		localStorage.setItem('darkMode', String($isDarkMode))
	})
</script>

<button
  onclick={() => ($isDarkMode = !$isDarkMode)}
  aria-label="Toggle dark mode"
  class="cursor-pointer"
>
  <span
    class="w-5 h-5 align-sub"
    class:icon-[ph--moon-bold]={$isDarkMode}
    class:icon-[ph--sun-bold]={!$isDarkMode}
  ></span>
</button>
