import 'reflect-metadata';

import { setupModules } from '@/plugin';
import { setupModules as setupNotificationModule } from "@cloud-platform/vue2-notify-plugin/src/plugin";

import Components from "@/components";
import { Factory } from "../../../vue2-test-utils/src"

describe("SetPassword.vue", () => {
  it("mounts", () => {

    // Arrange
    const component = Factory.create(Components.SetPassword, (store) => {
      setupNotificationModule(store);
      setupModules(store);
    }, {
      regCode: "username|tempPassword"
    });

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });
});


