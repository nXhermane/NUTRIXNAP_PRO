import {
    ARGUMENT_INVALID,
    ARGUMENT_NOT_PROVIDED,
    ARGUMENT_OUT_OF_RANGE,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    AUTHORIZATION_ERROR
} from "./exception.code";
import { ExceptionBase } from "./exception.base";

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
    readonly code = ARGUMENT_INVALID;
}

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
    readonly code = ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends ExceptionBase {
    readonly code = ARGUMENT_OUT_OF_RANGE;
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
    readonly code = CONFLICT;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
    static readonly message = "Not found";

    constructor(message = NotFoundException.message) {
        super(message);
    }

    readonly code = NOT_FOUND;
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
    static readonly message = "Internal server error";

    constructor(message = InternalServerErrorException.message) {
        super(message);
    }

    readonly code = INTERNAL_SERVER_ERROR;
}

export class EmptyStringError extends ExceptionBase {
    static readonly message = "Property cannot be empty";
    constructor(message = EmptyStringError.message) {
        super(message);
    }
    readonly code = ARGUMENT_NOT_PROVIDED;
}
export class NegativeValueError extends ExceptionBase {
    static readonly message = "Property cannot be negative";
    constructor(message = NegativeValueError.message) {
        super(message);
    }
    readonly code = ARGUMENT_INVALID;
}
export class DuplicateValueError extends ExceptionBase {
    static readonly message = "Property values cannot be duplicated";
    constructor(message = DuplicateValueError.message) {
        super(message);
    }
    readonly code = ARGUMENT_INVALID;
}
export class AuthValueError extends ExceptionBase {
    static readonly message = "Property value is not authorized";
    constructor(message = AuthValueError.message) {
        super(message);
    }
    readonly code = AUTHORIZATION_ERROR;
}
export class InvalidArgumentFormatError extends ExceptionBase {
    static readonly message = "Property value cannot not be in this format";
    constructor(message = InvalidArgumentFormatError.message) {
        super(message);
    }
    readonly code = ARGUMENT_INVALID;
}
export class InvalidReference extends ExceptionBase {
    static readonly message = "Property reference is invalid";
    constructor(msg = InvalidReference.message) {
        super(msg);
    }
}
// InvalidEmailError: Déclenché lorsque l'adresse email fournie n'est pas valide selon le format attendu.
// EmptyStringError: Déclenché lorsqu'une chaîne de caractères obligatoire est vide ou nulle.
// InvalidDateError: Déclenché lorsque la date fournie n'est pas valide ou ne correspond pas au format attendu.
// OutOfRangeError: Déclenché lorsqu'une valeur numérique est en dehors de la plage de valeurs autorisées.
// NegativeValueError: Déclenché lorsqu'une valeur numérique est négative, mais qu'un nombre positif est attendu.
// MaxLengthExceededError: Déclenché lorsque la longueur d'une chaîne de caractères dépasse la longueur maximale autorisée.
// MinLengthError: Déclenché lorsque la longueur d'une chaîne de caractères est inférieure à la longueur minimale requise.
// InvalidPhoneNumberError: Déclenché lorsque le numéro de téléphone fourni n'est pas valide selon le format attendu.
// InvalidPostalCodeError: Déclenché lorsque le code postal fourni n'est pas valide selon le format attendu.
// DuplicateValueError: Déclenché lorsqu'une valeur dupliquée est fournie, mais qu'une valeur unique est attendue.
// MissingRequiredFieldError: Déclenché lorsqu'un champ obligatoire est manquant ou n'a pas été fourni.
// InvalidCurrencyError: Déclenché lorsque la devise fournie n'est pas valide ou n'est pas reconnue.
// InvalidPasswordError: Déclenché lorsque le mot de passe fourni ne respecte pas les règles de complexité attendues.
// InvalidFileTypeError: Déclenché lorsque le type de fichier fourni n'est pas autorisé ou ne correspond pas aux types de fichiers attendus.
// InvalidUrlError: Déclenché lorsque l'URL fournie n'est pas valide selon le format attendu.
// Ces noms d'erreurs sont des exemples courants, mais vous pouvez les adapter en fonction de vos besoins spécifiques et du contexte de votre application. L'objectif est de fournir des noms d'erreurs clairs et descriptifs qui aident à identifier rapidement le problème de validation rencontré.
