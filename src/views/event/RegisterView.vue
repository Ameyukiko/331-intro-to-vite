<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useMessageStore } from '@/stores/message'
import { RouterLink } from 'vue-router'
import type { AxiosError } from 'axios'

const messageStore = useMessageStore()
const authStore = useAuthStore()

const schema = yup.object({
  username: yup
    .string()
    .min(3, 'Use at least 3 characters')
    .required('The username is required'),
  password: yup
    .string()
    .min(6, 'Use at least 6 characters')
    .required('The password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { username: '', password: '', confirmPassword: '' },
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

const flashMessage = (text: string) => {
  messageStore.updateMessage(text)
  setTimeout(() => messageStore.resetMessage(), 3000)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register({
      username: values.username,
      password: values.password,
    })
    flashMessage('Registration successful. Please log in.')
    router.push({ name: 'login' })
  } catch (error) {
    const responseMessage =
      (error as AxiosError<{ message?: string }>).response?.data?.message ||
      'Could not complete registration.'
    flashMessage(responseMessage)
  }
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <InputText v-model="username" type="text" placeholder="your username" :error="errors.username" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <InputText v-model="password" type="password" placeholder="••••••••" :error="errors.password" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
          <div class="mt-2">
            <InputText
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              :error="errors.confirmPassword"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Go to login
        </RouterLink>
      </p>
    </div>
  </div>
</template>
