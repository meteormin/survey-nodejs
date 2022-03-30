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

    /**
     *
     * @param {string} name
     * @param {function} resolve
     * @param {string[]} args
     */
    resolve = (name, resolve, args = []) => {
        this._resolves[name] = {class: resolve, args: args};
    }

    /**
     *
     * @param {string} name
     * @param {function} dependency
     */
    register = (name, dependency) => {
        this._dependencies[name] = dependency;
    }

    /**
     *
     * @param {function} resolve
     * @param {any[]} args
     * @returns {*}
     */
    inject = (resolve, args = []) => {
        const rArgs = args.map((arg) => this.make(arg));
        return new resolve(...rArgs);
    }

    /**
     *
     * @param {function} name
     * @param {any[]} args
     * @returns {*}
     */
    make = (name, args = null) => {
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