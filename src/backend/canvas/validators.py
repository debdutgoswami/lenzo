from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible
from django.template.defaultfilters import filesizeformat


@deconstructible
class FileValidator(object):
    error_messages = {
        'max_size': ("Ensure this file size is not greater than %(max_size)s."
                     " Your file size is %(size)s."),
        'min_size': ("Ensure this file size is not less than %(min_size)s. "
                     "Your file size is %(size)s."),
    }

    def __init__(self, max_size=None, min_size=None):
        self.max_size = max_size
        self.min_size = min_size

    def __call__(self, data):
        if self.max_size is not None and data.size > self.max_size:
            params = {
                'max_size': filesizeformat(self.max_size),
                'size': filesizeformat(data.size),
            }
            raise ValidationError(self.error_messages['max_size'],
                                  'max_size', params)

        if self.min_size is not None and data.size < self.min_size:
            params = {
                'min_size': filesizeformat(self.min_size),
                'size': filesizeformat(data.size)
            }
            raise ValidationError(self.error_messages['min_size'],
                                  'min_size', params)

    def __eq__(self, other):
        return (
                isinstance(other, FileValidator) and
                self.max_size == other.max_size and
                self.min_size == other.min_size
        )
