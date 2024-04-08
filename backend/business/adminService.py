import json
from ..data.models.user import User
from ..extensions import db, bcrypt

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
    if user is None:
        return False
    
    # Updates user role
    user.role = update_user_data['role']
    db.session.commit()

    return True