<template>
  <ClientOnly>
    <DevOnly>
      <div
        class="fixed bottom-4 right-4 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white sm:h-10 sm:w-10 sm:text-base"
      >
        <span class="sm:hidden"> - </span>
        <span class="hidden sm:inline md:hidden">sm</span>
        <span class="hidden md:inline lg:hidden">md</span>
        <span class="hidden lg:inline xl:hidden">lg</span>
        <span class="hidden xl:inline 2xl:hidden">xl</span>
        <span class="hidden 2xl:inline">2xl</span>
      </div>
    </DevOnly>
  </ClientOnly>
</template>
