from django.db import migrations

import google.auth
from google.cloud import secretmanager as sm


def createsuperuser(apps, schema_editor):

    # Retrieve secret from Secret Manager
    _, project = google.auth.default()
    client = sm.SecretManagerServiceClient()
    name = f"projects/{project}/secrets/admin_password/versions/latest"
    admin_password = client.access_secret_version(name=name).payload.data.decode(
        "UTF-8"
    )

    # Create a new user using acquired password
    from django.contrib.auth import get_user_model

    User = get_user_model()
    User.objects.create_superuser(
        uid="admin", username="admin", password=admin_password
    )


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [migrations.RunPython(createsuperuser)]
