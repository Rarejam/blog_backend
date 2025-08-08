TABLE USERS

TABLE BLOG POST 
-date image title article  
    -TABLE COMMENTS
     -(user) text date


Model user (
id Int @default(autoincrement())
username String
email String
password String
confirm_password String
author_password Boolean?
date TimeStamp
comments Comment[]
)

Model user_login{
write jwt syntax    
}

model blog (
id Int @default(autoincrement())
author @relation()
title S?tring
article String
date TimeStamp
)



