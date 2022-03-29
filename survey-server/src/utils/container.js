class Container {
    _dependencies = {};
    _resolves = {};

    /**
     *
     * @param {Object} dependencies
     */
    constructor(dependencies = {}) {
        this._dependencies = dependencies;
    }

    resolve = (name, factory, args = []) => {
        this._resolves[name] = {class: factory, args: args};
    }

    register = (name, dependency) => {
        this._dependencies[name] = dependency;
    }

    inject = (resolve, args = []) => {
        const rArgs = args.map((arg) => this.get(arg));
        return new resolve(...rArgs);
    }

    get = (name, args) => {
        if (!this._dependencies[name]) {
            if (this._resolves[name]) {
                this._dependencies[name] = this.inject(this._resolves[name]['class'], args ? args : this._resolves[name]['args']);
            }
            if (!this._dependencies[name]) {
                throw new Error(`Cannot find module: ${name}`);
            }
        }

        return this._dependencies[name];
    }
}

export default Container;