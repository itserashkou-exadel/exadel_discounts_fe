<template>
  <v-content>
    <SubscriptionsMobile class="hidden-md-and-up"/>
    <Subscriptions class="hidden-sm-and-down"/>
  </v-content>
</template>

<script>
import Subscriptions from "@/components/Subscriptions/Subscriptions";
import SubscriptionsMobile from "@/components/Subscriptions/SubscriptionsMobile";

export default {
  name: "SubscriptionsPage",
  components: {SubscriptionsMobile, Subscriptions}
};
</script>
