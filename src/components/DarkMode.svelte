<script lang="ts">
  let isDarkMode = localStorage.getItem("darkMode") === "true";

  $: {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDarkMode));
  }
</script>

<button
  on:click={() => (isDarkMode = !isDarkMode)}
  aria-label="Toggle dark mode"
>
  <span
    class="w-5 h-5 align-sub"
    class:icon-[ph--moon-bold]={isDarkMode}
    class:icon-[ph--sun-bold]={!isDarkMode}
  ></span>
</button>
