from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class CanvasConfig(AppConfig):
    name = "canvas"
    verbose_name = _("canvas")

    def ready(self):
        import canvas.signals  # noqa
