import {makeAutoObservable} from "mobx";
import {v4} from 'uuid';

const DEFAULT_COLLECTION_SIZE = 10000;

export class Store {
    size = DEFAULT_COLLECTION_SIZE;
    characters = []
    traits = []

    constructor() {
        makeAutoObservable(this)
    }

    get maxSize() {
        return this.characters.length * this.traits.length * this.traits.map(({variants}) => variants).flat().length;
    }

    addCharacter = ({value: name, weight, zIndex}) => this.characters.push({
        name, id: v4(), weight: parseInt(weight, 10) || 1, zIndex: parseInt(zIndex, 10) || 1
    });

    renameCharacter = (id, nextName) => this.findCharacter(id).name = nextName;

    changeCharacterWeight = (id, nextWeight) => this.findCharacter(id).weight = parseInt(nextWeight, 10);

    changeCharacterZIndex = (id, nextZIndex) => this.findCharacter(id).zIndex = parseInt(nextZIndex, 10);

    removeCharacter = (id) => this.characters = this.characters.filter((suspect) => suspect.id !== id);

    calcCharacterPortion = (id) =>
        (
            this.findCharacter(id).weight /
            this.characters.reduce((acc, {weight}) => acc + parseInt(weight, 10), 0)
        ) * 100;

    findCharacter = (id) => this.characters.find((suspect) => suspect.id === id);

    addTrait = ({value: type, zIndex}) => this.traits.push({
        type,
        id: v4(),
        variants: [],
        zIndex: parseInt(zIndex, 10) || 1
    })

    updateTrait = (id, nextData) => {
        const trait = this.findTrait(id);
        trait.zIndex = nextData.zIndex;
        trait.type = nextData.value;
    }

    removeTrait = (id) => this.traits = this.traits.filter((suspect) => suspect.id !== id);

    findTrait = (id) => this.traits.find((suspect) => suspect.id === id);

    addVariant = (id, {value, weight}) => this.findTrait(id).variants.push({
        id: v4(),
        type: value,
        weight: parseInt(weight, 10) || 1
    });

    changeVariantType = (traitId, variantId, nextType) => this.findVariant(traitId, variantId).type = nextType;

    changeVariantWeight = (traitId, variantId, nextWeight) =>
        this.findVariant(traitId, variantId).weight = parseInt(nextWeight, 10);

    removeVariant = (traitId, variantId) => {
        const trait = this.findTrait(traitId);
        trait.variants = trait.variants.filter(({id}) => variantId !== id);
    }

    calcVariantPortion = (traitId, variantId) => (
        parseInt(this.findVariant(traitId, variantId).weight, 10) /
        this.findTrait(traitId).variants.reduce((acc, {weight}) => acc + parseInt(weight, 10), 0)
    ) * 100;

    findVariant = (traitId, variantId) => this.findTrait(traitId).variants.find(({id}) => id === variantId);
}
