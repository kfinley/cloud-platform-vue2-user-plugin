import Vuex from 'vuex';
import { Story } from '@storybook/vue/types-6-0';
import Register from "@/components/Register.vue";
import { container } from 'inversify-props';
import { RegisterRequest, RegisterResponse } from '@/types';
import { RegistrationStatus } from '@/store';
import { setupModules } from '@/plugin';
import { setupModules as setupNotificationModule } from "@cloud-platform/vue2-notify-plugin/src/plugin";
import { Notify } from "@cloud-platform/vue2-notify-plugin/src/components";
import { AlertType } from '@cloud-platform/vue2-notify-plugin/src/types';
import { Command } from '@cloud-platform/commands/src';
import { messages } from '@/resources/messages';
import { RegisterCommand } from "@/commands";

class mockRegisterCommand implements Command<RegisterRequest, RegisterResponse> {
  public async runAsync(login: RegisterRequest): Promise<RegisterResponse> {
    // Quick sleep to simulate api call
    await new Promise(resolve => setTimeout(resolve, 2000));

    return new Promise(resolve => {
      resolve({
        success: true
      } as RegisterResponse)
    });
  }
}

container.addTransient<RegisterCommand>(mockRegisterCommand, "RegisterCommand");

let store = new Vuex.Store({});
setupNotificationModule(store);
setupModules(store);

export default {
  title: 'Components/User/Register',
  component: Register,
};

const DefaultTemplate: Story = (args, { argTypes }) => ({
  components: { Register, Notify },
  store,
  template: '<div><notify /><register /></div>'
});

export const Default = DefaultTemplate.bind({});

const RegisteringTemplate: Story = (args, { argTypes }) => ({
  components: { Register },
  store: new Vuex.Store({
    modules: {
      Registration: {
        state: {
          status: RegistrationStatus.Registering
        }
      }
    }
  }),
  template: '<register />'
});

export const Registering = RegisteringTemplate.bind({});

const ThankYouTemplate: Story = (args, { argTypes }) => ({
  components: { Register, Notify },
  store: new Vuex.Store({
    modules: {
      Registration: {
        state: {
          status: RegistrationStatus.Registered
        }
      },
      Notification: {
        state: {
          notifications: [
            {
              header: messages.Registration.Registered.header,
              message: messages.Registration.Registered.message,
              type: AlertType.success,
            },
          ],
        }
      }
    }
  }),
  template: '<div><notify /><register /></div>'
});

export const ThankYou = ThankYouTemplate.bind({});

