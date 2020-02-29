<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="userprile-card" flat>
      <q-card-section class="text-center">
        <q-avatar size="100px" style="margin-bottom: 16px;">
          <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <p>
          Title
        </p>
      </q-card-section>
      <q-expansion-item
        class="shadow-1 overflow-hidden"
        style="border-top-left-radius:1em;border-top-right-radius:1em;"
        icon="explore"
        label="Counter"
        header-class="bg-blue-grey-5 text-white"
        expand-icon-class="text-white"
        default-opened
      >
        <q-card>
          <q-card-section style="padding: 2px;">
            <q-list>
              <q-item style="padding: 4px 4px;">
                <q-item-section
                  avatar
                  style="padding-right: 4px;min-width:35px;"
                >
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>List item</q-item-section>
                <q-item-section side>
                  <q-item-label caption>meta</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator
                spaced
                inset="item"
                style="margin-left:30px;width:calc(100% - 30px);margin-top: 1px;margin-bottom: 1px;"
              />

              <q-item style="padding: 4px 4px;">
                <q-item-section
                  avatar
                  style="padding-right: 4px;min-width:35px;"
                >
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>List item</q-item-section>
                <q-item-section side>
                  <q-item-label caption>meta</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.userprile-card {
  width: 100%;
  max-width: 350px;
}
</style>
