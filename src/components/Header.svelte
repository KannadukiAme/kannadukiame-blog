<script lang="ts">
  import siteConfig from "@utils/config";
  import DarkMode from "./DarkMode.svelte";
  export let pathname: string;

  const subpath = pathname.match(/[^\/]+/g);
</script>

<header
  class="flex p-4 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900 sticky top-0 z-10"
>
  <div class="flex-1 flex space-x-6 items-center">
    <slot />
    <div class="text-gray-900 dark:text-gray-50 text-3xl hidden sm:block">
      {siteConfig.heading}
    </div>
  </div>
  <div class="flex px-2 py-2 space-x-6 items-center">
    <div class="flex space-x-6 text-gray-300">
      {#each siteConfig.nav as item (item.name)}
        <a
          href={item.href}
          class="font-bold hover:text-sora-600"
          class:text-sora-700={item.href === pathname ||
            item.href === "/" + subpath?.[0]}
        >
          <span>{item.name}</span>
        </a>
      {/each}
    </div>
    <div
      class="flex space-x-6 text-gray-900 dark:text-gray-50 before:border-l before:border-gray-200 before:mr-6"
    >
      <DarkMode />
      <a
        href="https://github.com/KannadukiAme/kannadukiame-blog"
        target="_blank"
        aria-label="GitHub"
      >
        <span class="w-5 h-5 align-sub icon-[mdi--github]"></span>
      </a>
    </div>
  </div>
</header>
