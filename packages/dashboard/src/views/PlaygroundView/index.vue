<script setup lang="ts">
import CounterClockwiseClockIcon from '@radix-icons/vue/CounterClockwiseClockIcon'

import Separator from '@/components/ui/separator/Separator.vue';
import PresetSelector from './components/PresetSelector.vue';
import PresetShare from './components/PresetShare.vue';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class="hidden h-full flex-col md:flex">
    <div
      class="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 class="text-lg font-semibold">
        Playground
      </h2>
      <div class="ml-auto flex w-full space-x-2 sm:justify-end">
        <PresetSelector presets="{presets}" />
        <div class="hidden space-x-2 md:flex">
          <PresetShare />
        </div>
      </div>
    </div>
    <Separator />
    <Tabs default-value="complete" class="flex-1">
      <div class="container h-full py-6">
        <div class="grid h-full items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_200px]">
          <div class="hidden flex-col space-y-4 sm:flex md:order-2">
            <div class="grid gap-2">
              <HoverCard :open-delay="200">
                <HoverCardTrigger as-child>
                  <span
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mode
                  </span>
                </HoverCardTrigger>
                <HoverCardContent class="w-[320px] text-sm" side="left">
                  Choose the interface that best suits your task. You can
                  provide: a simple prompt to complete, starting and ending
                  text to insert a completion within, or some text with
                  instructions to edit it.
                </HoverCardContent>
              </HoverCard>
              <TabsList class="grid grid-cols-2">
                <TabsTrigger value="complete">
                  <span class="sr-only">Complete</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" class="h-5 w-5">
                    <rect x="4" y="3" width="12" height="2" rx="1" fill="currentColor" />
                    <rect x="4" y="7" width="12" height="2" rx="1" fill="currentColor" />
                    <rect x="4" y="11" width="3" height="2" rx="1" fill="currentColor" />
                    <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor" />
                    <rect x="8.5" y="11" width="3" height="2" rx="1" fill="currentColor" />
                    <rect x="8.5" y="15" width="3" height="2" rx="1" fill="currentColor" />
                    <rect x="13" y="11" width="3" height="2" rx="1" fill="currentColor" />
                  </svg>
                </TabsTrigger>
                <TabsTrigger value="insert">
                  <span class="sr-only">Insert</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" class="h-5 w-5">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                      fill="currentColor" />
                    <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor" />
                    <rect x="8.5" y="15" width="3" height="2" rx="1" fill="currentColor" />
                    <rect x="13" y="15" width="3" height="2" rx="1" fill="currentColor" />
                  </svg>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <div class="md:order-1">
              <TabsContent value="complete" class="mt-0 border-0 p-0">
                <div class="flex h-full flex-col space-y-4">
                  <Textarea placeholder="Write a tagline for an ice cream shop"
                    class="min-h-[400px] flex-1 p-4 md:min-h-[600px] lg:min-h-[600px]" />
                  <div class="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span class="sr-only">Show history</span>
                      <CounterClockwiseClockIcon class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="insert" class="mt-0 border-0 p-0">
                <div class="flex flex-col space-y-4">
                  <div class="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                    <Textarea placeholder="We're writing to [inset]. Congrats from OpenAI!"
                      class="h-full min-h-[300px] lg:min-h-[600px] xl:min-h-[600px]" />
                    <div class="rounded-md border bg-muted" />
                  </div>
                  <div class="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span class="sr-only">Show history</span>
                      <CounterClockwiseClockIcon class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
        </div>
      </div>
    </Tabs>
  </div>
</template>