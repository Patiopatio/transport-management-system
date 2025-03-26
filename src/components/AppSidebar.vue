<template>
  <Sidebar>
    <SidebarHeader class="border-b border-border p-6">
      <div class="flex flex-col space-y-1">
        <h1 class="text-xl font-bold">TMS</h1>
        <p class="text-sm text-muted-foreground">Transport Management</p>
      </div>
    </SidebarHeader>

    <SidebarContent class="p-4">
      <nav class="space-y-2">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="block w-full"
        >
          <Button
            variant="ghost"
            class="w-full justify-start"
            :class="{ 'bg-accent': $route.path === item.path }"
          >
            {{ item.name }}
          </Button>
        </RouterLink>
      </nav>
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarHeader, SidebarContent } from '@/components/ui/sidebar'
import { RouterLink } from 'vue-router'

const navigation = [
  { name: 'Drivers', path: '/drivers' },
  { name: 'Tours', path: '/tours' },
]
</script>
