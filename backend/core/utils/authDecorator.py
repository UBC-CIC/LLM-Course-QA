from functools import wraps
import jwt
from ...data.models.user import User
from flask import request

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        jwtToken = request.headers.get('Authorization', '').replace("Bearer ", "")
        print(jwtToken)
        try:
            # ref: https://stackoverflow.com/questions/55703156/aws-cognito-how-to-decode-jwt-in-python
            decoded_token = jwt.decode(jwtToken, algorithms=["RS256"], options={"verify_signature": False})
            user_id = decoded_token.get('sub')
            user = User.query.filter_by(id=user_id).first()
            if not user:
                return {'error': 'User not found'}, 400
        except:
            return {'error': 'Token Error'}, 401
        return f(user, *args, **kwargs)
    return decorated_function
