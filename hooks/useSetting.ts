import { create } from 'zustand'

type SettingStoreProps = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useSetting = create<SettingStoreProps>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}))