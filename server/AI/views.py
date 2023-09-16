from django.shortcuts import render

# Create your views here.
class AppBlockListView(CreateAPIView):
    serializer_class = AppListSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        profile = Profile.objects.get(user=user)
        # Assuming you are using the same Profile model that has a 'blocked' field

        if not profile.blocked:
            return Response({'detail': 'User is not blocked'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            app_list = serializer.validated_data['app_list']
            # Run your algorithm here and get the apps to be blocked
            # apps_to_block = your_algorithm(app_list)
            apps_to_block = []  # Replace this line with your algorithm
            return Response({'apps_to_block': apps_to_block}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
