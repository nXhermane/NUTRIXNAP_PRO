def largest_prime(numbers):
    """
    Returns the largest prime number in a list of numbers.

    Parameters:
    numbers (list): A list of numbers.

    Returns:
    int: The largest prime number in the list. If no prime numbers are found,
         the function returns None.
    """
    def is_prime(num):
        """
        Returns True if a number is prime, False otherwise.

        Parameters:
        num (int): A number.

        Returns:
        bool: True if the number is prime, False otherwise.
        """
        if num < 2:
            return False
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                return False
        return True

    largest = None
    for num in numbers:
        if is_prime(num) and num > largest:
            largest = num

    return largest
