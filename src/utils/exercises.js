import { exerciseOptions } from "./fetchData"

const exercisesApi = {
    getAll: (params) => {
        const url = "/exercises"
        return exerciseOptions.get(url, {params})
    },
    getBodyPartList: () => {
        const url = "/exercises/bodyPartList"
        return exerciseOptions.get(url)
    },
    getExercise: (id) => {
        const url = `/exercises/exercise/${id}`
        return exerciseOptions.get(url)
    },
    getTarget: (target) => {
        const url = `/exercises/target/${target}}`
        return exerciseOptions.get(url)
    },
    getEquipment: (equipment) => {
        const url = `/exercises/equipment/${equipment}}`
        return exerciseOptions.get(url)
    }
}

export default exercisesApi