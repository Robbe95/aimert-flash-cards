import type {
  AppButtonProps,
  Icon,
} from '@wisemen/vue-core'

interface Action {
  icon: Icon
  id?: string
  label: string
  onAction: () => Promise<void> | void
  variant: AppButtonProps['variant']

}

const actions = ref<Action[]>([])

export function useActions() {
  function setActions(newActions: Action[]) {
    actions.value = newActions
  }

  return {
    actions,
    setActions,
  }
}
