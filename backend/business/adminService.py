import json
from ..data.models.user import User, Role
from ..extensions import db
from .courseService import get_courses
import base64

def get_config():
    try:
        with open('core/config/logo.png', 'rb') as image_file:
            encoded_logo = base64.b64encode(image_file.read()).decode('utf-8')

        with open('core/config/colours.json') as f:
            colour_config = json.load(f)
        primary_colour = colour_config['primaryColour']
    except Exception as e:
        print(e)


    return {
        'logo': encoded_logo,
        'colour': primary_colour
    }

def update_config(update_config_data):
    if 'logo' in update_config_data and update_config_data['logo'] is not None:
        logo_base64 = update_config_data['logo']
        if logo_base64.startswith('data:image/png;base64,'):
            logo_base64 = logo_base64.replace('data:image/png;base64,', '')
        else:
            return False

        logo_base64 = base64.b64decode(logo_base64)
        with open('core/config/logo.png', 'wb') as f:
            f.write(logo_base64)

    if 'primaryColour' in update_config_data and update_config_data['primaryColour'] is not None:
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
        user.role = Role.Admin
        user.courses = get_courses()
    elif update_user_data['role'] == 'Instructor':
        user.role = Role.Instructor
    elif update_user_data['role'] == 'Student':
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