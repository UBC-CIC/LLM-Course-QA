import json
from ..data.models.user import User, Role
from ..extensions import db

def get_config():
    logo = open('core/config/logo.svg', 'rb').read()
    with open('core/config/colours.json') as f:
        colour_config = json.load(f)
    primary_colour = colour_config['primaryColour']

    return {
        'logo': logo,
        'colours': primary_colour
    }

def update_config(update_config_data):
    if 'logo' in update_config_data:
        with open('core/config/logo.svg', 'wb') as f:
            f.write(update_config_data['logo'])

    if 'primaryColour' in update_config_data:
        with open('core/config/colours.json', 'r') as f:
            colour_config = json.load(f)

        colour_config['primaryColour'] = update_config_data['primaryColour']
        with open('core/config/colours.json', 'w') as f:
            json.dump(colour_config, f)

    return True

def update_users(update_user_data):
    user = User.query.get(update_user_data['id'])
    print("user", user)
    if user is None:
        return False

    if update_user_data['role'] == 'Admin':
        print("admin")
        user.role = Role.Admin
    elif update_user_data['role'] == 'Instructor':
        print("instructor")
        user.role = Role.Instructor
    elif update_user_data['role'] == 'Student':
        print("student")
        user.role = Role.Student
    else:
        print("invalid role")

    db.session.commit()

    return True

def delete_user(delete_user_data):
    user = User.query.get(delete_user_data['user_id'])
    if user is None:
        return False

    db.session.delete(user)
    db.session.commit()

    return True