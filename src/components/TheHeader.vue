<template>
  <header>
    <h2 class="sr-only">Site Header Information</h2>
    <div class="relative bg-white mb-10">
      <div class="container">
        <div class="flex justify-between items-center border-b-2 border-gray-100 py-8 md:justify-start md:space-x-10">
          <!-- Logo and wordmark -->
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a
              href="#"
              class="text-brand-green-900 flex items-baseline">
              <span class="sr-only">Workflow</span>
              <svg class="h-10 fill-current  inline" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M11.1297051,19.0491803 C10.6246349,18.5245902 10.2142654,17.8360656 10.2142654,17.5737705 C10.2142654,17.2786885 10.0879979,17.0491803 9.89859656,17.0491803 C9.74076213,17.0491803 8.79375556,16.7213115 7.78361521,16.3606557 C3.45895186,14.6557377 0.175995746,9.37704918 0.0181613176,3.83606557 C-0.0449724539,1.73770492 0.0181613176,1.54098361 0.838900347,0.786885246 C1.72277315,0 1.78590692,0 7.46794636,0.0655737705 C12.4870812,0.163934426 13.2131196,0.229508197 13.3078202,0.68852459 C13.4656546,1.60655738 12.4870812,2.29508197 10.9718707,2.29508197 L9.5829277,2.29508197 L10.4036667,3.93442623 C11.3506733,5.83606557 11.2875395,7.18032787 10.1511316,8.42622951 C9.20412507,9.47540984 7.94144964,9.37704918 6.61564044,8.16393443 C5.54236632,7.21311475 4.84789484,7.1147541 4.84789484,8 C4.84789484,8.49180328 6.2684047,9.93442623 7.34167881,10.4918033 C9.23569196,11.5081967 12.1082786,9.37704918 12.1082786,6.95081967 C12.1398454,5.93442623 12.5186481,5.24590164 14.3495274,2.8852459 L16.5592095,0 L18.1375537,0 C19.3055285,0 19.7474649,0.131147541 19.9052993,0.524590164 C20.2209682,1.40983607 19.5264967,2.13114754 18.1691206,2.29508197 C17.0327127,2.42622951 16.7170439,2.68852459 15.296534,4.6557377 L13.6866228,6.85245902 L16.5276426,8.85245902 C19.4949298,10.9180328 20,11.5409836 20,12.9508197 C20,14.3606557 19.4633629,15.0163934 17.506216,16.0327869 C16.1804068,16.7540984 15.5490691,17.3114754 15.2649671,18.0327869 C14.8545976,19.0491803 13.5603553,20 12.5817818,20 C12.2976799,20 11.6347753,19.5737705 11.1297051,19.0491803 Z M14,16.0221988 C14,15.0197182 12.5178228,14.6048986 12.1277761,15.469106 C11.7377295,16.3678817 12.2837948,17.0938159 13.1809021,16.9901111 C13.765972,16.9209745 14,16.6444281 14,16.0221988 Z" id="Shape-Copy-2"  fill-rule="nonzero" transform="translate(10.000000, 10.000000) scale(-1, 1) rotate(-180.000000) translate(-10.000000, -10.000000) "></path>
              </svg>
              <span class="font-bold text-4xl tracking-tight leading-none pl-2">Toad </span>

            </a>
          </div>
          <!-- Hamburger button -->
          <div class="-mr-2 -my-2 md:hidden">
            <button
            type="button"
              @click="toggleMenu()"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <!-- Heroicon name: outline/menu -->
              <svg class="h-12 w-12 fill-current" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" x="0px" y="0px"><title>ui</title><g data-name="Layer 5"><path d="M69.5,28.58H37.28c-3.72,0-3.72,5.77,0,5.77H69.5C73.22,34.35,73.22,28.58,69.5,28.58Z"></path><path d="M69.51,50c3.71.29,3.69-5.49,0-5.78A210.92,210.92,0,0,0,38.62,44c-3.68.25-3.71,6,0,5.77A209.53,209.53,0,0,1,69.51,50Z"></path><path d="M69.5,58.07a218.52,218.52,0,0,1-30.15-1.51c-3.68-.43-3.65,5.34,0,5.78a220.09,220.09,0,0,0,30.15,1.5C73.21,63.77,73.22,58,69.5,58.07Z"></path></g></svg>
            </button>
          </div>
          <!-- Menu buttons -->
          <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-10">

            <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Project
            </a>
            <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Blog
            </a>
            <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Team
            </a>

          </div>
        </div>
      </div>
      <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-200 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
      <div
        v-show="isOpen"
        class="w-full h-full fixed block top-0 left-0 z-50 inset-x-0 md:hidden
              bg-gradient-to-b from-brand-green-300 to-brand-green-500 transition transform origin-top-right">
        <div class="pt-6 pb-6 px-8">
          <div class="flex items-center justify-between">
            <div>
              <!--<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">-->
              <a
              href="#"
              class=" text-brand-green-900 flex items-baseline">
              <span class="sr-only">Workflow</span>
              <svg class="h-10 fill-current  inline" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M11.1297051,19.0491803 C10.6246349,18.5245902 10.2142654,17.8360656 10.2142654,17.5737705 C10.2142654,17.2786885 10.0879979,17.0491803 9.89859656,17.0491803 C9.74076213,17.0491803 8.79375556,16.7213115 7.78361521,16.3606557 C3.45895186,14.6557377 0.175995746,9.37704918 0.0181613176,3.83606557 C-0.0449724539,1.73770492 0.0181613176,1.54098361 0.838900347,0.786885246 C1.72277315,0 1.78590692,0 7.46794636,0.0655737705 C12.4870812,0.163934426 13.2131196,0.229508197 13.3078202,0.68852459 C13.4656546,1.60655738 12.4870812,2.29508197 10.9718707,2.29508197 L9.5829277,2.29508197 L10.4036667,3.93442623 C11.3506733,5.83606557 11.2875395,7.18032787 10.1511316,8.42622951 C9.20412507,9.47540984 7.94144964,9.37704918 6.61564044,8.16393443 C5.54236632,7.21311475 4.84789484,7.1147541 4.84789484,8 C4.84789484,8.49180328 6.2684047,9.93442623 7.34167881,10.4918033 C9.23569196,11.5081967 12.1082786,9.37704918 12.1082786,6.95081967 C12.1398454,5.93442623 12.5186481,5.24590164 14.3495274,2.8852459 L16.5592095,0 L18.1375537,0 C19.3055285,0 19.7474649,0.131147541 19.9052993,0.524590164 C20.2209682,1.40983607 19.5264967,2.13114754 18.1691206,2.29508197 C17.0327127,2.42622951 16.7170439,2.68852459 15.296534,4.6557377 L13.6866228,6.85245902 L16.5276426,8.85245902 C19.4949298,10.9180328 20,11.5409836 20,12.9508197 C20,14.3606557 19.4633629,15.0163934 17.506216,16.0327869 C16.1804068,16.7540984 15.5490691,17.3114754 15.2649671,18.0327869 C14.8545976,19.0491803 13.5603553,20 12.5817818,20 C12.2976799,20 11.6347753,19.5737705 11.1297051,19.0491803 Z M14,16.0221988 C14,15.0197182 12.5178228,14.6048986 12.1277761,15.469106 C11.7377295,16.3678817 12.2837948,17.0938159 13.1809021,16.9901111 C13.765972,16.9209745 14,16.6444281 14,16.0221988 Z" id="Shape-Copy-2"  fill-rule="nonzero" transform="translate(10.000000, 10.000000) scale(-1, 1) rotate(-180.000000) translate(-10.000000, -10.000000) "></path>
              </svg>
              <span class="font-bold text-4xl tracking-tight leading-none pl-2">Toad </span>

            </a>
            </div>
            <div class="-mr-2">
              <button
                @click="toggleMenu()"
                type="button"
                class="rounded-full p-3 inline-flex items-center justify-center text-gray-400
                hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset
                focus:ring-indigo-500">
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
                <svg class="h-10 w-10 fill-current"  fill="none"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" x="0px" y="0px"><title>Close</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon fill="#4D4D4D" points="19.586 3 12 10.586 4.414 3 3 4.414 10.586 12 3 19.586 4.414 21 12 13.414 19.586 21 21 19.586 13.414 12 21 4.414"></polygon></g></svg>
              </button>
            </div>
          </div>
          <div class="mt-16">
            <nav class="">
              <ul class="uppercase font-light text-4xl space-y-10 ml-14">
                <li>
                  <a href="#" class="">Blog</a>
                </li>
                <li>
                  <a href="#" class="">Team</a>
                </li>
                <li>
                  <a href="#" class="">Project</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import { enableScrollLock , disableScrollLock } from "./../composables/scroll-lock";

export default {
  setup() {
    const isOpen = ref(false);

    function toggleMenu() {

      // Toggle the menu status
      isOpen.value = !isOpen.value;

      // Set scroll state
      isOpen.value ? enableScrollLock() : disableScrollLock();

    }

    return {
      isOpen,
      toggleMenu,
    }
  }
}
</script>
