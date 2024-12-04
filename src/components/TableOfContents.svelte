<script lang="ts">
  import type { TOC } from '@utils/toc'

  export let toc: TOC[]
</script>

{#if toc}
  <ul>
    {#each toc as item (item.slug)}
      <li>
        <a href={`#${item.slug}`}>{item.text}</a>
        <svelte:self toc={item.children} />
      </li>
    {/each}
  </ul>
{/if}
