from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class CanvasConfig(AppConfig):
    name = "lenzo.canvas"
    verbose_name = _("canvas")

    def ready(self):
        import lenzo.canvas.signals  # noqa
