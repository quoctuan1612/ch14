class AddNotificationJob < ApplicationJob
  queue_as :default

  def perform(follower_id, followed_id, created_at)
    follower = User.find_by(id: follower_id)
    number_of_follower = Relationship.where("followed_id = :followed_id AND created_at > :start AND created_at < :end", {followed_id: followed_id, start: created_at, end: created_at + 15})
    ActionCable.server.broadcast("notifications_channel_#{followed_id}", {follower_name: follower.name, number_of_follower: number_of_follower.length, b: Relationship.all})
  end
end
