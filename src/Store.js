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

    addCharacter = (name, weight) => this.characters.push({name, id: v4(), weight: weight || 1});

    renameCharacter = (id, nextName) => this.findCharacter(id).name = nextName;

    changeCharacterWeight = (id, nextWeight) => this.findCharacter(id).weight = nextWeight;

    removeCharacter = (id) => this.characters = this.characters.filter((suspect) => suspect.id !== id);

    calcCharacterPortion = (id) =>
        (
            this.findCharacter(id).weight /
            this.characters.reduce((acc, {weight}) => acc + parseInt(weight, 10), 0)
        ) * 100;

    findCharacter = (id) => this.characters.find((suspect) => suspect.id === id);

    addTrait = (type) => this.traits.push({type, id: v4(), variants: []})

    changeTraitType = (id, nextType) => this.findTrait(id).type = nextType;

    removeTrait = (id) => this.traits = this.traits.filter((suspect) => suspect.id !== id);

    findTrait = (id) => this.traits.find((suspect) => suspect.id === id);

    addVariant = (id, type, weight) => this.findTrait(id).variants.push({id: v4(), type, weight: weight || 1});

    changeVariantType = (traitId, variantId, nextType) => this.findVariant(traitId, variantId).type = nextType;

    changeVariantWeight = (traitId, variantId, nextWeight) =>
        this.findVariant(traitId, variantId).weight = nextWeight;

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
