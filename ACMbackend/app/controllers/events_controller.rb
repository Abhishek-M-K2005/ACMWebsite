class EventsController < ApplicationController
  def index
    user = current_user_or_nil

    # If logged in, include all events (open + intra club).
    # If not logged in, return only public/open events (is_intra_club: false).
    @events = if user.present?
                Event.order(start_time: :desc)
              else
                Event.where(is_intra_club: false).order(start_time: :desc)
              end

    render json: @events.as_json(include: :sub_events), status: :ok
  end

  def show
    @event = Event.find(params[:id])
    render json: @event.as_json(include: :sub_events), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Event not found"}, status: :not_found
  end
end