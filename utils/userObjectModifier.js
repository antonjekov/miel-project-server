const userObjectModifier = (user) => {
    return {
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        shoppingCard: user.shoppingCard
    }
}

module.exports= userObjectModifier