import FullContainer from '../Containers/FullContainer/FullContainer'
import MinContainer from '../Containers/MinContainer'

export const useContainer = (isMin: boolean) =>
  isMin ? MinContainer : FullContainer
