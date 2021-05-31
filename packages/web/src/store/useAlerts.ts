import { combine } from 'zustand/middleware'
import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type Alert = {
    id: string;
    message: string;
    alertType: AlertType;
    timeout: number;
}

export type AlertType = "info" | "warning" | "success" | "error" | undefined;

/*export const useAlerts = create(
  combine(
    {
        alerts: [] as Alert[]
    },
    (set, get) => ({ 
        add: (message: string, alertType: AlertType, timeout = 3) => set((state) => {
            const id = uuidv4();
            setTimeout(() => {
                get().remove()
            }, timeout * 1000);

        }),
        remove: (id: string) => set((state) => ({alerts: state.alerts.filter(alert => alert.id !== id)}))
    })
  ),
)*/

type State = {
    alerts: Alert[];
    add: (message: string, alertType: AlertType, timeout?: number) => void;
    remove: (id: string) => void;
}

export const useAlerts = create<State>((set) => ({
    alerts: [] as Alert[],
    add: (message: string, alertType: AlertType, timeout = 3) => set((state) => {
        const id = uuidv4();
        state.alerts = [...state.alerts, {id, message, alertType, timeout}];
        setTimeout(() => {
            state.remove(id);
        }, timeout * 1000);
    }),
    remove: (id: string) => set((state) => ({ alerts: state.alerts.filter(alert => alert.id !== id) }))
}))