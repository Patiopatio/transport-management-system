<template>
  <SidebarProvider>
    <div class="flex min-h-screen bg-background">
      <!-- Sidebar -->
      <aside class="hidden lg:block">
        <AppSidebar />
      </aside>

      <!-- Main Content -->
      <main class="flex-1 w-full">
        <div class="flex h-16 items-center px-4 lg:hidden">
          <SidebarTrigger />
        </div>
        <RouterView class="p-4 md:p-6 w-full" />
      </main>
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
</script>
