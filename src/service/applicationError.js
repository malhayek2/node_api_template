class ApplicationError extends Error{
    constructor(cause, builder){
        super();
        this.cause = cause;
        this.builder = builder;
        if (cause !== undefined && cause !== null){
            this.message = cause.message;
        }
    }
}

function create(cause, builder){
    return new ApplicationError(cause, builder);
}

module.exports = {
    ApplicationError: ApplicationError,
    create: create
};
