import jwt

def get_user_id(jwtToken):
    try:
        jwtToken = jwtToken.replace("Bearer ", "")
        # ref: https://stackoverflow.com/questions/55703156/aws-cognito-how-to-decode-jwt-in-python
        decoded_token = jwt.decode(jwtToken, algorithms=["RS256"], options={"verify_signature": False})
        print(decoded_token)
        user_id = decoded_token.get('sub')

        return user_id
    except:
        print("Invalid token")