<script setup lang="ts">
import OrganizerService from '@/Services/OrganizerService';
import type { Organizer } from '@/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  address: ''
})

const router = useRouter()
const isSubmitting = ref(false)

function saveOrganizer() {
  if (!organizer.value.name.trim() || !organizer.value.address.trim()) {
    return
  }

  isSubmitting.value = true

  OrganizerService.saveOrganizer(organizer.value)
    .then(() => {
      router.push({ name: 'event-list-view' })
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      isSubmitting.value = false
    })
}
</script>

<template>
  <div class="organizer-form-container">
    <h1>Create an organizer</h1>

    <form @submit.prevent="saveOrganizer" class="organizer-form">
      <div class="field-group">
        <label for="organizer-name">Name *</label>
        <input
          id="organizer-name"
          v-model="organizer.name"
          type="text"
          placeholder="Enter organizer name"
          class="field"
          :class="{ error: !organizer.name.trim() && organizer.name !== '' }"
          required
        />
      </div>

      <div class="field-group">
        <label for="organizer-address">Address *</label>
        <input
          id="organizer-address"
          v-model="organizer.address"
          type="text"
          placeholder="Enter organizer address"
          class="field"
          :class="{ error: !organizer.address.trim() && organizer.address !== '' }"
          required
        />
      </div>

      <div class="form-actions">
        <button
          class="button -fill-gradient"
          type="submit"
          :disabled="isSubmitting || !organizer.name.trim() || !organizer.address.trim()"
        >
          {{ isSubmitting ? 'Saving...' : 'Create Organizer' }}
        </button>

        <button
          class="button -fill-gray"
          type="button"
          @click="router.back()"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.organizer-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.organizer-form-container h1 {
  color: #39b982;
  margin-bottom: 2rem;
  text-align: center;
}

.organizer-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.field-group {
  margin-bottom: 1.5rem;
}

.field-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.debug-section {
  margin-top: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.debug-section summary {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.debug-section pre {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
}

/* Global styles from original component */
b,
strong {
  font-weight: bolder;
}

small {
  font-size: 80%;
}

.eyebrow {
  font-size: 20px;
}

.-text-primary {
  color: #39b982;
}

.-text-base {
  color: #000;
}

.-text-error {
  color: tomato;
}

.-text-gray {
  color: rgba(0, 0, 0, 0.5);
}

.-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}

button,
label,
input,
optgroup,
select,
textarea {
  display: inline-flex;
  font-family: 'Open sans', sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: none;
}

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 2px solid #39b982;
}

label {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

input,
textarea {
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.4);
}

input.error,
select.error {
  margin-bottom: 0;
}

input + p.errorMessage {
  margin-bottom: 24px;
}

textarea {
  width: 100%;
  overflow: auto;
  font-size: 20px;
}

[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
  margin-right: 0.5rem;
}

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

input,
[type='text'],
[type='number'],
[type='search'],
[type='password'] {
  height: 52px;
  width: 100%;
  padding: 0 10px;
  font-size: 20px;
}

input:focus,
[type='text']:focus,
[type='number']:focus,
[type='search']:focus,
[type='password']:focus {
  border-color: #39b982;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

[hidden] {
  display: none;
}

.error {
  border: 1px solid red;
}

select {
  width: 100%;
  height: 52px;
  padding: 0 24px 0 10px;
  vertical-align: middle;
  background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right 12px center;
  background-size: 8px 10px;
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select:focus {
  border-color: #39b982;
  outline: 0;
}

select:focus::ms-value {
  color: #000;
  background: #fff;
}

select::ms-expand {
  opacity: 0;
}

.field {
  margin-bottom: 24px;
}

.errorMessage {
  color: red;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 40px;
  background: transparent;
  border: none;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s linear;
  cursor: pointer;
}

.button:hover:not(:disabled) {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.button:active:not(:disabled) {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}

.button:focus {
  outline: 0;
}

.button:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
  opacity: 0.6;
  cursor: not-allowed;
}

.button + .button {
  margin-left: 1em;
}

.button.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}

.button.-fill-gray {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.button.-size-small {
  height: 32px;
}

.button.-icon-right {
  text-align: left;
  padding: 0 20px;
}

.button.-icon-right > .icon {
  margin-left: 10px;
}

.button.-icon-left {
  text-align: right;
  padding: 0 20px;
}

.button.-icon-left > .icon {
  margin-right: 10px;
}

.button.-icon-center {
  padding: 0 20px;
}
</style>
