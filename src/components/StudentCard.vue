<script setup lang="ts">
import type { Student } from '@/types'
defineProps<{
  student: Student
}>()
</script>

<template>
  <div class="student-class">
<div class="p-5 w-[250px] cursor-pointer border border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-[0_3px_12px_0_rgba(0,0,0,0.2)]">
      <h2>{{ student.name }} {{ student.surname }}</h2>
      <p>{{ student.gpa }}</p>
    </div>
  </div>
</template>
